import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { FullRecipe } from "@/types/full-recipe";
import { formatNumber } from "@/utils/formatNumber";

export function RecipeCard({ fullRecipe }: { fullRecipe: FullRecipe }) {
  const products = fullRecipe.products;
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const totalDiscountRate = products.reduce(
    (acc, product) => acc + (product.discountRate ?? 0),
    0
  );
  const totalBasePrice = products.reduce(
    (acc, product) => acc + (product.basePrice ?? product.price),
    0
  );
  const averageDiscountRate = totalDiscountRate / products.length;

  return (
    <a href={`/recipes/${fullRecipe.id}`}>
      <div className={cn("m-2 bg-card text-card-foreground")}>
        <CardContent className="p-0 w-[220px] h-[430px]">
          <div className="overflow-hidden mb-2 rounded-lg h-[220px] w-[220px]">
            <Image
              src={fullRecipe.video.snippet.thumbnails.high.url}
              alt=""
              width={230}
              height={230}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm mt-2">
            {fullRecipe.video.title.slice(0, 30)}
          </span>
          <div className="h-fit">
            <span className={cn("text-xs text-gray-500 overflow-hidden")}>
              {fullRecipe.video.description.slice(0, 50) + "..."}
            </span>
          </div>
          <div className="my-2">
            {averageDiscountRate && totalBasePrice && (
              <div className="flex items-baseline text-xs space-x-1">
                <span className="text-red-600 font-medium">와우할인가</span>
                <span>{averageDiscountRate.toFixed(0)}%</span>
                <span className="line-through text-gray-400">
                  {formatNumber(totalBasePrice)}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <span className="text-red-600 font-bold">
                {formatNumber(totalPrice)}원
              </span>
              <Image
                src="https://image6.coupangcdn.com/image/badges/falcon/v1/web/rocket-fresh@2x.png"
                alt="로켓프레시"
                width={72}
                height={16}
              />
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium mb-2">
            {products[0].arrivalInfo}
          </div>
          <div className="mt-2">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">(1,000)</span>
            </div>
          </div>
        </CardContent>
      </div>
    </a>
  );
}
