import { GetServerSideProps } from "next";
import { IProduct } from "../../../interfaces";
import { dbFetchs } from "../../../database";
import { AdminProductForm } from "../../../components";

interface Props {
  product: IProduct;
}

const AdminEditProductPage = ({ product }: Props) => {
  return <AdminProductForm product={product} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;

  const product = await dbFetchs.getProductBySlug(slug.toString());

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default AdminEditProductPage;
