
"use-client";

import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import JoinRoom from '@/app/components/seekhoot/joinroom';
import NavBar from '@/app/components/NavBar';

export default function shplayer() {
    return (
	<div>
	    <NavBar />
	    <main className={"ml-16 p-6"}>
		<JoinRoom />
	    </main>
	</div>
    );
}
