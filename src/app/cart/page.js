import HeroTop from '@/components/modules/heroTop/HeroTop'
import Navbar from "@/components/modules/navbar/Navbar";
import CartTable from '@/components/templates/userCart/CartTable';
import { authUser } from '@/utils/authUser';
import React from 'react'

async function UserCart() {
    const user = await authUser();
  return (
    <div>
        <Navbar isLogin={user ? true : false} isAdmin={user?.role === "ADMIN" ? true : false}/>
        <HeroTop route="cart" bg="/images/about/about3.jpg" />
        <CartTable />
    </div>
  )
}

export default UserCart