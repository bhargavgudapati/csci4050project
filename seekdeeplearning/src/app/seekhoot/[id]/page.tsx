
"use client"

import { useParams, useRouter } from 'next/navigation';
import React, { useState } from "react";
import Seekhootjoin from "@/app/components/seekhootjoin/seekhootjoin";
import HootUser from "@/app/components/seekhootjoin/hootusers";

export default function seekhoot() {
    const router = useRouter();
    const params = useParams();
    
    return (
	<div>
	    <Seekhootjoin qrcodeURL={"https://i.imgur.com/jYjaWdX.png"} />
	    <h1>this is page {params.id}</h1>
	    <HootUser />
	</div>
    );
}


