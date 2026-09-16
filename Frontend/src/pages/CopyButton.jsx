import {React, useState} from 'react'

function CopyButton({ textToCopy }){
    const [isCopied, setIsCopied] =useState(false);
    
    const handleCopy = async() =>{
        try{
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false),2000)
        }
        catch(error){
            console.error('failed to copy text: ',error);
        }
    };

    return(
        <button onClick={handleCopy}>{isCopied? 'Copied!' : 'Copy'}Copy</button>
    )
}

export default CopyButton;