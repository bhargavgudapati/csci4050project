
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function page() {
    const { id } = useParams();
    
    return (
	<div>
		 you are on page {id}
	</div>
    );
}
