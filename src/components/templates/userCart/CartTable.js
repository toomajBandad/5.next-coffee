"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

function CartTable() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = async (index) => {
    const result = await Swal.fire({
      title: "Remove item?",
      text: "Are you sure you want to delete this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, remove it",
    });

    if (result.isConfirmed) {
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Item removed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto my-5 p-6 bg-white rounded-lg shadow-md overflow-x-auto">

      {cart.length === 0 ? (
        <p className="text-gray-600 text-2xl text-center h-50 flex items-center justify-center">Your cart is empty.🛒</p>
      ) : (
        <table className="min-w-[600px] w-full border-collapse text-center">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="text-gray-700">
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.productID || `${item.name}-${index}`} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">${item.price.toLocaleString()}</td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="min-w-[24px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-3 font-semibold text-green-700">
                  ${(item.price * item.quantity).toLocaleString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="p-3 font-bold text-lg text-center">
                Total:
              </td>
              <td className="p-3 font-bold text-green-800 text-lg text-center">
                ${totalPrice.toLocaleString()}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      )}

      {cart.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 cursor-pointer transition font-semibold"
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartTable;