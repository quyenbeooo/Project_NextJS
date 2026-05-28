export interface DressImage {
  id: string;
  color: string;
  label: string;
}

export interface DressVariant {
  color: string;
  colorCode: string;
  available: boolean;
}

export interface DressAccessory {
  id: string;
  name: string;
  price: number;
}

export interface DressReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

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
  status: "available" | "maintenance" | "locked";
  images: DressImage[];
  variants: DressVariant[];
  accessories: DressAccessory[];
  reviews: DressReview[];
  rating: number;
  reviewCount: number;
  material: string;
  style: string;
  length: string;
}

export interface CartItem {
  dressId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  startDate: string;
  endDate: string;
  accessories: string[];
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipping"
  | "renting"
  | "returned"
  | "completed"
  | "cancelled"
  | "expired";

export interface Order {
  id: string;
  customerName: string;
  dressName: string;
  dressId: string;
  size: string;
  color: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  deposit: number;
  status: OrderStatus;
  createdAt: string;
  timeline: { status: string; date: string; note: string }[];
  review?: DressReview;
  paymentMethod: string;
  shippingAddress: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  createdAt: string;
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

export const colorOptions = [
  { name: "Đỏ", code: "#dc2626" },
  { name: "Hồng", code: "#ec4899" },
  { name: "Xanh dương", code: "#2563eb" },
  { name: "Xanh lá", code: "#16a34a" },
  { name: "Vàng", code: "#eab308" },
  { name: "Tím", code: "#9333ea" },
  { name: "Trắng", code: "#ffffff" },
  { name: "Đen", code: "#171717" },
  { name: "Be", code: "#d6d3d1" },
  { name: "Navy", code: "#1e3a5f" },
];

export const dresses: Dress[] = [
  {
    id: "1",
    name: "Váy Cầu Vồng Pastel",
    description:
      "Váy dáng dài mềm mại với tông màu pastel nhẹ nhàng, phù hợp cho tiệc cưới và sự kiện trang trọng. Chất liệu lụa cao cấp, form ôm nhẹ nhàng.",
    price: 350000,
    deposit: 500000,
    size: ["S", "M", "L"],
    color: "Hồng pastel",
    category: "Váy cưới",
    available: true,
    status: "available",
    material: "Lụa cao cấp",
    style: "Thanh lịch",
    length: "Dài",
    rating: 4.8,
    reviewCount: 24,
    images: [
      { id: "1a", color: "#f9a8d4", label: "Ảnh chính" },
      { id: "1b", color: "#f472b6", label: "Ảnh sau" },
      { id: "1c", color: "#ec4899", label: "Ảnh chi tiết" },
      { id: "1d", color: "#db2777", label: "Ảnh mặc" },
    ],
    variants: [
      { color: "Hồng pastel", colorCode: "#f9a8d4", available: true },
      { color: "Hồng đậm", colorCode: "#ec4899", available: true },
      { color: "Trắng", colorCode: "#ffffff", available: false },
    ],
    accessories: [
      { id: "a1", name: "Vòng cổ ngọc trai", price: 50000 },
      { id: "a2", name: "Bông tai đồng bộ", price: 30000 },
      { id: "a3", name: "Vòng tay lụa", price: 20000 },
    ],
    reviews: [
      { id: "r1", userName: "Trần Thị B", rating: 5, comment: "Váy rất đẹp, chất lượng tốt!", date: "2026-05-20" },
      { id: "r2", userName: "Lê Văn C", rating: 4, comment: "Váy mặc vừa ý, giao hàng nhanh.", date: "2026-05-18" },
    ],
  },
  {
    id: "2",
    name: "Váy Đêm Hoàng Hôn",
    description:
      "Váy dạ hội sang trọng với chất liệu lụa cao cấp, thiết kế ôm body tôn dáng. Phù hợp tiệc tối, sự kiện trang trọng.",
    price: 500000,
    deposit: 800000,
    size: ["XS", "S", "M"],
    color: "Đỏ rượu",
    category: "Váy dạ hội",
    available: true,
    status: "available",
    material: "Lụa satin",
    style: "Sang trọng",
    length: "Dài",
    rating: 4.9,
    reviewCount: 18,
    images: [
      { id: "2a", color: "#991b1b", label: "Ảnh chính" },
      { id: "2b", color: "#b91c1c", label: "Ảnh sau" },
      { id: "2c", color: "#dc2626", label: "Ảnh chi tiết" },
      { id: "2d", color: "#ef4444", label: "Ảnh mặc" },
    ],
    variants: [
      { color: "Đỏ rượu", colorCode: "#991b1b", available: true },
      { color: "Đỏ bright", colorCode: "#dc2626", available: true },
      { color: "Đen", colorCode: "#171717", available: true },
    ],
    accessories: [
      { id: "a4", name: "Clutch da", price: 80000 },
      { id: "a5", name: "Khuyên tai ngọc", price: 40000 },
    ],
    reviews: [
      { id: "r3", userName: "Phạm Minh D", rating: 5, comment: "Sang trọng hơn mong đợi!", date: "2026-05-15" },
    ],
  },
  {
    id: "3",
    name: "Váy Ngọt Ngào Mùa Xuân",
    description:
      "Váy dự tiệc nữ tính với họa tiết hoa nhí, dài bắp chân, phù hợp nhiều dịp từ dạo phố đến tiệc nhẹ.",
    price: 280000,
    deposit: 400000,
    size: ["S", "M", "L", "XL"],
    color: "Trắng kem",
    category: "Váy dự tiệc",
    available: true,
    status: "available",
    material: "Cotton混 sợi",
    style: "Nữ tính",
    length: "Dài bắp chân",
    rating: 4.6,
    reviewCount: 31,
    images: [
      { id: "3a", color: "#fef3c7", label: "Ảnh chính" },
      { id: "3b", color: "#fde68a", label: "Ảnh sau" },
      { id: "3c", color: "#fcd34d", label: "Ảnh chi tiết" },
    ],
    variants: [
      { color: "Trắng kem", colorCode: "#fef3c7", available: true },
      { color: "Hồng nhạt", colorCode: "#fce7f3", available: true },
    ],
    accessories: [
      { id: "a6", name: "Mũ lưỡi trai", price: 25000 },
      { id: "a7", name: "Túi xách mini", price: 45000 },
    ],
    reviews: [
      { id: "r4", userName: "Nguyễn Thị E", rating: 5, comment: "Dễ thương quá!", date: "2026-05-22" },
      { id: "r5", userName: "Hoàng Văn F", rating: 4, comment: "Bạn gái thích lắm.", date: "2026-05-20" },
    ],
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
    status: "available",
    material: "Cotton",
    style: "Chuyên nghiệp",
    length: "Gối",
    rating: 4.5,
    reviewCount: 42,
    images: [
      { id: "4a", color: "#1e3a5f", label: "Ảnh chính" },
      { id: "4b", color: "#1e40af", label: "Ảnh sau" },
      { id: "4c", color: "#2563eb", label: "Ảnh chi tiết" },
    ],
    variants: [
      { color: "Xanh navy", colorCode: "#1e3a5f", available: true },
      { color: "Đen", colorCode: "#171717", available: true },
      { color: "Xám", colorCode: "#6b7280", available: true },
    ],
    accessories: [
      { id: "a8", name: "Thắt lưng da", price: 35000 },
    ],
    reviews: [
      { id: "r6", userName: "Mai Văn G", rating: 5, comment: "Váy mặc thoải mái, form đẹp.", date: "2026-05-25" },
    ],
  },
  {
    id: "5",
    name: "Váy Dạo Phố Phong Cách",
    description:
      "Váy dáng A năng động, phù hợp đi chơi, dạo phố cuối tuần. Chất liệu nhẹ, thoáng khí.",
    price: 180000,
    deposit: 250000,
    size: ["XS", "S", "M", "L"],
    color: "Be",
    category: "Váy dạo phố",
    available: false,
    status: "maintenance",
    material: "Linen",
    style: "Năng động",
    length: "Gối",
    rating: 4.3,
    reviewCount: 15,
    images: [
      { id: "5a", color: "#d6d3d1", label: "Ảnh chính" },
      { id: "5b", color: "#a8a29e", label: "Ảnh sau" },
      { id: "5c", color: "#78716c", label: "Ảnh chi tiết" },
    ],
    variants: [
      { color: "Be", colorCode: "#d6d3d1", available: false },
      { color: "Trắng", colorCode: "#ffffff", available: true },
    ],
    accessories: [],
    reviews: [],
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
    status: "available",
    material: "Lụa tơ tằm",
    style: "Quý phái",
    length: "Dài",
    rating: 4.9,
    reviewCount: 12,
    images: [
      { id: "6a", color: "#365314", label: "Ảnh chính" },
      { id: "6b", color: "#4d7c0f", label: "Ảnh sau" },
      { id: "6c", color: "#65a30d", label: "Ảnh chi tiết" },
      { id: "6d", color: "#84cc16", label: "Ảnh mặc" },
    ],
    variants: [
      { color: "Xanh rêu", colorCode: "#365314", available: true },
      { color: "Xanh lá", colorCode: "#16a34a", available: true },
      { color: "Vàng mustard", colorCode: "#ca8a04", available: true },
    ],
    accessories: [
      { id: "a9", name: "Voan đội đầu", price: 60000 },
      { id: "a10", name: "Găng tay lụa", price: 45000 },
      { id: "a11", name: "Ví clutch lụa", price: 70000 },
    ],
    reviews: [
      { id: "r7", userName: "Đỗ Thị H", rating: 5, comment: "Cao cấp, sang trọng!", date: "2026-05-10" },
    ],
  },
];

// Mock rental calendar (dress id -> booked dates)
export const rentalCalendar: Record<string, { start: string; end: string }[]> = {
  "1": [
    { start: "2026-06-01", end: "2026-06-03" },
    { start: "2026-06-10", end: "2026-06-12" },
  ],
  "2": [
    { start: "2026-06-05", end: "2026-06-06" },
  ],
  "3": [],
  "4": [
    { start: "2026-06-15", end: "2026-06-17" },
  ],
  "5": [],
  "6": [
    { start: "2026-06-08", end: "2026-06-10" },
  ],
};

export const orders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Trần Thị B",
    dressName: "Váy Cầu Vồng Pastel",
    dressId: "1",
    size: "M",
    color: "Hồng pastel",
    startDate: "2026-06-01",
    endDate: "2026-06-03",
    totalPrice: 700000,
    deposit: 500000,
    status: "renting",
    createdAt: "2026-05-25",
    paymentMethod: "Chuyển khoản",
    shippingAddress: "Quận 1, TP.HCM",
    phone: "0901 234 567",
    timeline: [
      { status: "pending", date: "2026-05-25 10:00", note: "Đơn hàng được tạo" },
      { status: "confirmed", date: "2026-05-25 14:30", note: "Shop xác nhận đơn" },
      { status: "shipping", date: "2026-05-30 09:00", note: "Đang giao hàng" },
      { status: "renting", date: "2026-06-01 08:00", note: "Khách đã nhận váy" },
    ],
  },
  {
    id: "ORD-002",
    customerName: "Lê Văn C",
    dressName: "Váy Đêm Hoàng Hôn",
    dressId: "2",
    size: "S",
    color: "Đỏ rượu",
    startDate: "2026-06-05",
    endDate: "2026-06-06",
    totalPrice: 500000,
    deposit: 800000,
    status: "pending",
    createdAt: "2026-05-28",
    paymentMethod: "COD",
    shippingAddress: "Quận 3, TP.HCM",
    phone: "0902 345 678",
    timeline: [
      { status: "pending", date: "2026-05-28 16:00", note: "Đơn hàng chờ xử lý" },
    ],
  },
  {
    id: "ORD-003",
    customerName: "Phạm Minh D",
    dressName: "Váy Lụa Sang Trọng",
    dressId: "6",
    size: "M",
    color: "Xanh rêu",
    startDate: "2026-05-20",
    endDate: "2026-05-22",
    totalPrice: 1200000,
    deposit: 1000000,
    status: "completed",
    createdAt: "2026-05-15",
    paymentMethod: "VNPay",
    shippingAddress: "Quận 7, TP.HCM",
    phone: "0903 456 789",
    timeline: [
      { status: "pending", date: "2026-05-15 08:00", note: "Đơn hàng được tạo" },
      { status: "confirmed", date: "2026-05-15 10:00", note: "Shop xác nhận" },
      { status: "shipping", date: "2026-05-18 14:00", note: "Đang giao" },
      { status: "renting", date: "2026-05-20 09:00", note: "Khách nhận váy" },
      { status: "returned", date: "2026-05-22 16:00", note: "Khách trả váy" },
      { status: "completed", date: "2026-05-22 17:00", note: "Hoàn tất" },
    ],
    review: { id: "r10", userName: "Phạm Minh D", rating: 5, comment: "Váy rất đẹp, chất lượng tốt!", date: "2026-05-23" },
  },
  {
    id: "ORD-004",
    customerName: "Nguyễn Thị E",
    dressName: "Váy Công Sở Thanh Lịch",
    dressId: "4",
    size: "L",
    color: "Xanh navy",
    startDate: "2026-06-10",
    endDate: "2026-06-12",
    totalPrice: 400000,
    deposit: 300000,
    status: "confirmed",
    createdAt: "2026-05-27",
    paymentMethod: "Chuyển khoản",
    shippingAddress: "Quận Bình Thạnh, TP.HCM",
    phone: "0904 567 890",
    timeline: [
      { status: "pending", date: "2026-05-27 11:00", note: "Đơn hàng được tạo" },
      { status: "confirmed", date: "2026-05-27 15:00", note: "Shop xác nhận" },
    ],
  },
  {
    id: "ORD-005",
    customerName: "Hoàng Văn F",
    dressName: "Váy Ngọt Ngào Mùa Xuân",
    dressId: "3",
    size: "M",
    color: "Trắng kem",
    startDate: "2026-05-15",
    endDate: "2026-05-16",
    totalPrice: 280000,
    deposit: 400000,
    status: "cancelled",
    createdAt: "2026-05-10",
    paymentMethod: "COD",
    shippingAddress: "Quận 10, TP.HCM",
    phone: "0905 678 901",
    timeline: [
      { status: "pending", date: "2026-05-10 09:00", note: "Đơn hàng được tạo" },
      { status: "cancelled", date: "2026-05-11 10:00", note: "Khách hủy đơn" },
    ],
  },
];

export const users: User[] = [
  { id: "U01", name: "Admin", email: "admin@dressrental.vn", phone: "0900 000 000", role: "admin", createdAt: "2026-01-01" },
  { id: "U02", name: "Trần Thị B", email: "tranb@gmail.com", phone: "0901 234 567", role: "user", createdAt: "2026-03-10" },
  { id: "U03", name: "Lê Văn C", email: "levanc@gmail.com", phone: "0902 345 678", role: "user", createdAt: "2026-03-15" },
  { id: "U04", name: "Phạm Minh D", email: "phamd@gmail.com", phone: "0903 456 789", role: "user", createdAt: "2026-04-01" },
  { id: "U05", name: "Nguyễn Thị E", email: "nguyene@gmail.com", phone: "0904 567 890", role: "user", createdAt: "2026-04-20" },
];
