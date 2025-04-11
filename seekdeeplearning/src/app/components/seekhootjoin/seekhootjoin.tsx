
import React from 'react';
import Image from 'next/image';
import styles from "./seekhootjoin.module.css";

interface props {
    qrcodeURL: string
}

const Seekhootjoin: React.FC<props> = ({qrcodeURL}) => {
    return (
	<div className={styles.text}>
	    <h2>To join from your phone, just scan the QR code shown to join.</h2>
	    <Image alt="qrcode here" src={qrcodeURL} width="200" height="200" />
	</div>
    );
}

export default Seekhootjoin;
