"use client";

export default function GlobalError() {
    return (
        <html>
            <body className="bg-bg text-text-primary flex min-h-screen items-center justify-center">
                <div className="bg-card mx-4 w-full max-w-md rounded-xl p-8 text-center shadow-lg">
                    {/* آیکون هشدار */}
                    <div className="mb-4 flex justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-warning h-16 w-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    {/* متن خطا */}
                    <h2 className="mb-3 text-2xl font-bold">مشکلی در سامانه رخ داده است</h2>

                    <p className="text-text-secondary mb-8 leading-relaxed">لطفاً ساعاتی بعد مجدد تلاش کنید.</p>

                    {/* دکمه رفرش */}
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary-100 hover:bg-primary-200 focus:ring-primary-300 inline-block rounded-lg px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    >
                        تلاش مجدد
                    </button>
                </div>
            </body>
        </html>
    );
}
