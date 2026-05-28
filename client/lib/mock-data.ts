export interface Dress {
  id: string;
  name: string;
  description: string;
  price: number;
  deposit: number;
  size: string[];
  color: string;
  category: string;
  available: boolean;
}

export const categories = [
  "Tất cả",
  "Váy cưới",
  "Váy dạ hội",
  "Váy dự tiệc",
  "Váy công sở",
  "Váy dạo phố",
];

export const sizes = ["XS", "S", "M", "L", "XL"];

export const dresses: Dress[] = [
  {
    id: "1",
    name: "Váy Cầu Vồng Pastel",
    description:
      "Váy dáng dài mềm mại với tông màu pastel nhẹ nhàng, phù hợp cho tiệc cưới và sự kiện trang trọng.",
    price: 350000,
    deposit: 500000,
    size: ["S", "M", "L"],
    color: "Hồng pastel",
    category: "Váy cưới",
    available: true,
  },
  {
    id: "2",
    name: "Váy Đêm Hoàng Hôn",
    description:
      "Váy dạ hội sang trọng với chất liệu lụa cao cấp, thiết kế ôm body tôn dáng.",
    price: 500000,
    deposit: 800000,
    size: ["XS", "S", "M"],
    color: "Đỏ rượu",
    category: "Váy dạ hội",
    available: true,
  },
  {
    id: "3",
    name: "Váy Ngọt Ngào Mùa Xuân",
    description:
      "Váy dự tiệc nữ tính với họa tiết hoa nhí,_length dài bắp chân, phù hợp nhiều dịp.",
    price: 280000,
    deposit: 400000,
    size: ["S", "M", "L", "XL"],
    color: "Trắng kem",
    category: "Váy dự tiệc",
    available: true,
  },
  {
    id: "4",
    name: "Váy Công Sở Thanh Lịch",
    description:
      "Váy công sở dáng suông, chất liệu cotton thoáng mát, phù hợp môi trường làm việc chuyên nghiệp.",
    price: 200000,
    deposit: 300000,
    size: ["M", "L", "XL"],
    color: "Xanh navy",
    category: "Váy công sở",
    available: true,
  },
  {
    id: "5",
    name: "Váy Dạo Phố Phong Cách",
    description:
      "Váy dáng A năng động, phù hợp đi chơi, dạo phố cuối tuần.",
    price: 180000,
    deposit: 250000,
    size: ["XS", "S", "M", "L"],
    color: "Be",
    category: "Váy dạo phố",
    available: false,
  },
  {
    id: "6",
    name: "Váy Lụa Sang Trọng",
    description:
      "Váy lụa cao cấp thiết kế tối giản, sang trọng, phù hợp tiệc tối và sự kiện đặc biệt.",
    price: 600000,
    deposit: 1000000,
    size: ["XS", "S", "M"],
    color: "Xanh rêu",
    category: "Váy dạ hội",
    available: true,
  },
];
