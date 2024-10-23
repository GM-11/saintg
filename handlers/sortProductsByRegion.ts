type t = {
  title: string;
  subtitle: string;
  amount: number;
  price: number;
  imageUri: string;
  currency: string;
  // originalPrice?: number;
  sizes: string[];
  productId: number;
  // discountPercentage?: number;
};

export default function sortProductsByRegion(data: any[], regionData: any[]) {
  const finalData: t[] = [];

  const productIds = regionData.map((val: any) => val.product_id);
  data.forEach((val: any) => {
    if (productIds.includes(val.product_id)) {
      const sizes = (val.product_size as { label: string }[]).map(
        (val) => val.label,
      );

      finalData.push({
        title: val.product_name,
        subtitle: val.description,
        imageUri: val.product_images[0].image_url,
        amount: 1,
        price: regionData.find((v) => v.product_id === val.product_id).price,
        productId: parseInt(val.product_id),
        currency: regionData.find((v) => v.product_id === val.product_id)
          .currency_type,
        sizes,
      });
    }
  });

  return finalData;
}
