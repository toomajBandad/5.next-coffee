import HeroTop from '@/components/modules/heroTop/HeroTop'
import Navbar from "@/components/modules/navbar/Navbar";
import MainCheckout from '@/components/templates/checkout/MainCheckout';
import { authUser } from '@/utils/authUser';
import React from 'react'

async function Checkout() {
    const user = await authUser();
  return (
    <div>
        <Navbar isLogin={user ? true : false} />
        <HeroTop route="cart" bg="/images/about/about3.jpg" />
        <MainCheckout />
    </div>
  )
}

export default Checkout