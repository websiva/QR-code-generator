import { useState } from 'react';
import './QRCode.css'

function QRCode() {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("https://websiva.online/");
    const [qrSize, setQrSize] = useState("150");
    async function generateQR() {
        try {
            setLoading(true);
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }
        catch (error) {
            console.error("Error when creating QR Code" + error)
        }
        finally {
            setLoading(false);
        }
    }
    function downloadQR() {
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error)=>{
            console.error("Error when downloading qr code"+error);
        });
    }
    return (
        <>
            <div className="main">
                <div className="heading-content">
                    <h4 className="heading">Generate and Publish <span>Dynamic</span> QR Codes</h4>
                    <p className="description">It allowes users to easily create customized QR codes for sharing or embedding on their website.</p>
                </div>
                <div className="app-container">
                    {loading && <p>Please wait...</p>}
                    {img && <img src={img} alt="" />}
                    <div className='input-fields'>
                        <label htmlFor="inputData" className="input-label">Data for QR Code:</label>
                        <input type="text" id='inputData' placeholder='Enter data for QR Code' value={qrData} onChange={(e) => setQrData(e.target.value)} />
                        <label htmlFor="QRSize" className="input-label">Image size (e.g.,150):</label>
                        <input type="text" id='QRSize' placeholder='Enter image size' value={qrSize} onChange={(e) => setQrSize(e.target.value)} />
                        <div className="buttons">
                            <button className="primary" onClick={generateQR} disabled={loading}>Generate QR Code</button>
                            <button className="primary outline" onClick={downloadQR}>Download QR Code</button>
                        </div>
                        <p>Developed by Sivakumar</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default QRCode