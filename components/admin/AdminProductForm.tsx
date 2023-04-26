import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  TextField,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
  Chip,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import audioRealmApi from "../../axios/audioRealmApi";
import { ICategory, IProduct } from "../../interfaces";
import { generateSlug } from "../../utils";
import { AdminLayout } from "../layouts";
import { useRouter } from "next/router";

interface Props {
  product?: IProduct;
  creating?: boolean;
}

interface FormData {
  _id?: string;
  category: ICategory;
  description: string;
  images: string[];
  price: number;
  slug: string;
  title: string;
  inStock: number;
}

export const AdminProductForm = ({ product, creating }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const validCategories = ["earphone", "headphone", "speaker"];
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({
    defaultValues: creating
      ? {
          category: "speaker",
          description: "",
          images: ["img1.jpg", "img2.jpg"],
          inStock: 0,
          price: 10,
          slug: "",
          title: "",
        }
      : product,
  });

  const handleSubmitForm = async (form: FormData) => {
    if (form.images.length < 2) return;
    setIsSaving(true);

    try {
      const { data } = await audioRealmApi({
        url: "/admin/products",
        method: creating ? "POST" : "PUT",
        data: form,
      });

      console.log({ data });

      if (!form._id) {
        router.push(`/admin/products/${form.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      setIsSaving(true);
      console.log({ error });
    }
  };

  const handleImageSelector = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files?.length || !target.files) return;

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await audioRealmApi.post(
          "/admin/upload-image",
          formData
        );
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteImage = (image: string) => {
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  return (
    <AdminLayout
      title={"Product"}
      subTitle={
        creating ? "Creating new product" : `Editing: ${product!.title}`
      }
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px" }}
            type="submit"
            disabled={isSaving}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("title", {
                required: "Required field",
                minLength: { value: 2, message: "At least 2 characters" },
                onChange({ target }) {
                  setValue("slug", generateSlug(target.value), {
                    shouldValidate: true,
                  });
                },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register("description", {
                required: "Required field",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Stock"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("inStock", {
                required: "Required field",
                min: { value: 1, message: "Minimum 1" },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Price"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("price", {
                required: "Required field",
                min: { value: 1, message: "Minimum 1" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Category</FormLabel>
              <RadioGroup
                row
                value={getValues("category")}
                onChange={({ target }) =>
                  setValue("category", target.value as ICategory, {
                    shouldValidate: true,
                  })
                }
              >
                {validCategories.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("slug", {
                required: "Required field",
                validate: (value) =>
                  value.trim().includes(" ")
                    ? "Empty spaces not allowed"
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload image
              </Button>
              <input
                multiple
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageSelector}
              />
              <Chip
                label="At least 2 images"
                color="error"
                variant="outlined"
                sx={{
                  display: getValues("images").length < 2 ? "flex" : "none",
                }}
              />

              <Grid container spacing={2}>
                {getValues("images").map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={
                          img.includes("https://res.cloudinary.com")
                            ? img
                            : `/products-2/${img}`
                        }
                        alt={img}
                      />
                      <CardActions>
                        <Button
                          onClick={() => handleDeleteImage(img)}
                          fullWidth
                          color="error"
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};
