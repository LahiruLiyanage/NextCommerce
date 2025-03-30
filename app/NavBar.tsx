import Link from 'next/link';

export default function NavBar () {
    return (
        <nav className={"bg-white shadow-md dark:bg-black dark:shadow-gray-900 dark:text-gray-200"}>
            <div className={"container mx-auto px-4 py-3 flex justify-between items-center"}>
                <ul className={"flex space-x-4"}>
                    <li>
                        <Link href="/products" className={"font-bold text-gray-700 hover:text-gray-950 dark:text-gray-300 hover:dark:text-gray-100"}>
                            Products
                        </Link>
                    </li>

                    <li>
                        <Link href="/cart" className={"font-bold text-gray-700 hover:text-gray-950 dark:text-gray-300 hover:dark:text-gray-100"}>
                            Cart
                        </Link>
                    </li>

                    <li>
                        <Link href="/checkout" className={"font-bold text-gray-700 hover:text-gray-950 dark:text-gray-300 hover:dark:text-gray-100"}>
                            Checkout
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    )
}
