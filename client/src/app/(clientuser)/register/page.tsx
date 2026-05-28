import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center justify-center px-4 py-20 page-enter">
      <Card className="w-full animate-scale-in">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-xl animate-fade-in-down">Đăng ký</CardTitle>
          <CardDescription className="animate-fade-in-down delay-100">
            Tạo tài khoản để bắt đầu thuê váy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-1.5 animate-fade-in-up delay-200">
              <label htmlFor="name" className="text-sm font-medium">
                Họ và tên
              </label>
              <Input id="name" type="text" placeholder="Nguyễn Văn A" className="transition-all duration-200 focus:scale-[1.02]" />
            </div>
            <div className="space-y-1.5 animate-fade-in-up delay-200">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="you@example.com" className="transition-all duration-200 focus:scale-[1.02]" />
            </div>
            <div className="space-y-1.5 animate-fade-in-up delay-300">
              <label htmlFor="phone" className="text-sm font-medium">
                Số điện thoại
              </label>
              <Input id="phone" type="tel" placeholder="0901 234 567" className="transition-all duration-200 focus:scale-[1.02]" />
            </div>
            <div className="space-y-1.5 animate-fade-in-up delay-300">
              <label htmlFor="password" className="text-sm font-medium">
                Mật khẩu
              </label>
              <Input id="password" type="password" placeholder="••••••••" className="transition-all duration-200 focus:scale-[1.02]" />
            </div>
            <Button type="submit" className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg animate-fade-in-up delay-400">
              Đăng ký
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground animate-fade-in delay-500">
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-medium text-foreground hover:underline">
              Đăng nhập
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
