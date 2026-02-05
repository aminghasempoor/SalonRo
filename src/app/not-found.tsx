import Link from "next/link";

export default function NotFound() {
    return (
        <div className="bg-bg text-text-primary flex min-h-screen items-center justify-center">
            <div className="bg-card mx-4 w-full max-w-md rounded-xl p-8 text-center shadow-lg">
                <h2 className="mb-2 text-2xl font-bold">صفحه مورد نظر یافت نشد</h2>

                <p className="text-text-secondary mb-6 leading-relaxed">
                    متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.
                </p>

                <Link
                    href="/"
                    className="bg-primary-100 hover:bg-primary-200 inline-block rounded-lg px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg"
                >
                    بازگشت به صفحه اصلی
                </Link>
            </div>
        </div>
    );
}
