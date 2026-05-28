import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold">
              <ShoppingBag className="h-4 w-4" />
              DressRental
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Cho thuê váy cao cấp, giúp bạn tỏa sáng trong mọi dịp.
            </p>
          </div>

          {/* Dịch vụ */}
          <div>
            <h3 className="text-sm font-semibold">Dịch vụ</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li><Link href="/dresses" className="hover:text-foreground">Thuê váy</Link></li>
              <li><Link href="/dresses?category=Váy cưới" className="hover:text-foreground">Váy cưới</Link></li>
              <li><Link href="/dresses?category=Váy dạ hội" className="hover:text-foreground">Váy dạ hội</Link></li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="text-sm font-semibold">Hỗ trợ</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Hướng dẫn thuê</Link></li>
              <li><Link href="#" className="hover:text-foreground">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="hover:text-foreground">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-sm font-semibold">Liên hệ</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>Hotline: 0901 234 567</li>
              <li>Email: hello@dressrental.vn</li>
              <li>Địa chỉ: Quận 1, TP.HCM</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} DressRental. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}
