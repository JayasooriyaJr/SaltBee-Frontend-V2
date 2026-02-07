import foodBibimbap from "@/assets/food-bibimbap.jpg";
import foodBulgogi from "@/assets/food-bulgogi.jpg";
import foodKimchiJjigae from "@/assets/food-kimchi-jjigae.jpg";
import foodJapchae from "@/assets/food-japchae.jpg";
import foodTteokbokki from "@/assets/food-tteokbokki.jpg";
import foodGalbi from "@/assets/food-galbi.jpg";
import foodSundubu from "@/assets/food-sundubu.jpg";
import foodChicken from "@/assets/food-chicken.jpg";
import foodPajeon from "@/assets/food-pajeon.jpg";
import foodNaengmyeon from "@/assets/food-naengmyeon.jpg";
import foodMandu from "@/assets/food-mandu.jpg";
import foodBanchan from "@/assets/food-banchan.jpg";

export type MenuCategory = "all" | "bbq" | "rice" | "noodles" | "soups" | "appetizers" | "sides";

export interface MenuItem {
  id: string;
  name: string;
  korean: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  spicy?: boolean;
  popular?: boolean;
  vegetarian?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "bibimbap",
    name: "Stone Pot Bibimbap",
    korean: "돌솥비빔밥",
    description: "Sizzling stone pot rice topped with seasoned vegetables, beef, fried egg, and gochujang sauce.",
    price: 16.99,
    image: foodBibimbap,
    category: "rice",
    popular: true,
    spicy: true,
  },
  {
    id: "bulgogi",
    name: "Bulgogi",
    korean: "불고기",
    description: "Thinly sliced marinated beef, grilled to perfection. Served with lettuce wraps and banchan.",
    price: 19.99,
    image: foodBulgogi,
    category: "bbq",
    popular: true,
  },
  {
    id: "kimchi-jjigae",
    name: "Kimchi Jjigae",
    korean: "김치찌개",
    description: "Hearty kimchi stew with pork belly, tofu, and aged kimchi in a rich, spicy broth.",
    price: 14.99,
    image: foodKimchiJjigae,
    category: "soups",
    spicy: true,
    popular: true,
  },
  {
    id: "japchae",
    name: "Japchae",
    korean: "잡채",
    description: "Sweet potato glass noodles stir-fried with vegetables, beef, and sesame oil.",
    price: 15.99,
    image: foodJapchae,
    category: "noodles",
  },
  {
    id: "tteokbokki",
    name: "Tteokbokki",
    korean: "떡볶이",
    description: "Chewy rice cakes in a sweet and spicy gochujang sauce with fish cakes.",
    price: 12.99,
    image: foodTteokbokki,
    category: "appetizers",
    spicy: true,
    popular: true,
  },
  {
    id: "galbi",
    name: "Galbi",
    korean: "갈비",
    description: "Grilled marinated short ribs, caramelized with a sweet soy glaze. A house specialty.",
    price: 28.99,
    image: foodGalbi,
    category: "bbq",
    popular: true,
  },
  {
    id: "sundubu",
    name: "Sundubu Jjigae",
    korean: "순두부찌개",
    description: "Silky soft tofu stew with seafood, vegetables, and egg in a spicy broth.",
    price: 14.99,
    image: foodSundubu,
    category: "soups",
    spicy: true,
  },
  {
    id: "chicken",
    name: "Korean Fried Chicken",
    korean: "양념치킨",
    description: "Double-fried crispy chicken wings glazed with sweet and spicy gochujang sauce.",
    price: 15.99,
    image: foodChicken,
    category: "appetizers",
    spicy: true,
    popular: true,
  },
  {
    id: "pajeon",
    name: "Haemul Pajeon",
    korean: "해물파전",
    description: "Crispy seafood and green onion pancake served with soy dipping sauce.",
    price: 13.99,
    image: foodPajeon,
    category: "appetizers",
  },
  {
    id: "naengmyeon",
    name: "Naengmyeon",
    korean: "냉면",
    description: "Chilled buckwheat noodles in icy beef broth with cucumber, egg, and Asian pear.",
    price: 14.99,
    image: foodNaengmyeon,
    category: "noodles",
  },
  {
    id: "mandu",
    name: "Mandu",
    korean: "만두",
    description: "Handmade Korean dumplings, pan-fried golden. Stuffed with pork and vegetables.",
    price: 11.99,
    image: foodMandu,
    category: "appetizers",
  },
  {
    id: "banchan",
    name: "Banchan Set",
    korean: "반찬",
    description: "Assorted traditional Korean side dishes including kimchi, pickled radish, and spinach.",
    price: 8.99,
    image: foodBanchan,
    category: "sides",
    vegetarian: true,
  },
];

export const categories: { value: MenuCategory; label: string; korean: string }[] = [
  { value: "all", label: "All Dishes", korean: "전체" },
  { value: "bbq", label: "BBQ & Grill", korean: "구이" },
  { value: "rice", label: "Rice Bowls", korean: "밥" },
  { value: "noodles", label: "Noodles", korean: "면" },
  { value: "soups", label: "Soups & Stews", korean: "찌개" },
  { value: "appetizers", label: "Appetizers", korean: "전채" },
  { value: "sides", label: "Sides", korean: "반찬" },
];
