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

// --- Admin mock data ---

export interface Order {
  id: string;
  customerName: string;
  dressName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "delivered" | "returned" | "cancelled";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  createdAt: string;
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Trần Thị B",
    dressName: "Váy Cầu Vồng Pastel",
    startDate: "2026-06-01",
    endDate: "2026-06-03",
    totalPrice: 700000,
    status: "confirmed",
  },
  {
    id: "ORD-002",
    customerName: "Lê Văn C",
    dressName: "Váy Đêm Hoàng Hôn",
    startDate: "2026-06-05",
    endDate: "2026-06-06",
    totalPrice: 500000,
    status: "pending",
  },
  {
    id: "ORD-003",
    customerName: "Phạm Minh D",
    dressName: "Váy Lụa Sang Trọng",
    startDate: "2026-05-20",
    endDate: "2026-05-22",
    totalPrice: 1200000,
    status: "returned",
  },
  {
    id: "ORD-004",
    customerName: "Nguyễn Thị E",
    dressName: "Váy Công Sở Thanh Lịch",
    startDate: "2026-06-10",
    endDate: "2026-06-12",
    totalPrice: 400000,
    status: "pending",
  },
  {
    id: "ORD-005",
    customerName: "Hoàng Văn F",
    dressName: "Váy Ngọt Ngào Mùa Xuân",
    startDate: "2026-05-15",
    endDate: "2026-05-16",
    totalPrice: 280000,
    status: "delivered",
  },
];

export const users: User[] = [
  { id: "U01", name: "Admin", email: "admin@dressrental.vn", phone: "0900 000 000", role: "admin", createdAt: "2026-01-01" },
  { id: "U02", name: "Trần Thị B", email: "tranb@gmail.com", phone: "0901 234 567", role: "user", createdAt: "2026-03-10" },
  { id: "U03", name: "Lê Văn C", email: "levanc@gmail.com", phone: "0902 345 678", role: "user", createdAt: "2026-03-15" },
  { id: "U04", name: "Phạm Minh D", email: "phamd@gmail.com", phone: "0903 456 789", role: "user", createdAt: "2026-04-01" },
  { id: "U05", name: "Nguyễn Thị E", email: "nguyene@gmail.com", phone: "0904 567 890", role: "user", createdAt: "2026-04-20" },
];
