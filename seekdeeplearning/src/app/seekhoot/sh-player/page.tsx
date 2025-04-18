
"use-client";

import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import JoinRoom from '@/app/components/seekhoot/joinroom';

export default function shplayer() {
    return (
	<div>
	    <JoinRoom />
	</div>
    );
}
