"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import Seekhootjoin from "../components/seekhootjoin/seekhootjoin"
import HootUser from "../components/seekhootjoin/hootusers";

export default function seekhoot() {
    return (
	<div>
	    <Seekhootjoin qrcodeURL={"https://i.imgur.com/jYjaWdX.png"} />
	    <HootUser />
	</div>
    );
}


