
import React, { useState } from 'react';
import styles from '@/app/components/seekhoot/question.module.css';

interface params {
    inputQuestion: string
}

const Question: React.FC<params> = ({ inputQuestion }) => {
    return (
	<div className={styles.questionbox}>
	    <p className={styles.miniheader}><b>question:</b></p> 
	    <p className={styles.questiontext}>{inputQuestion}</p>
	</div>
    );
}

export default Question;


