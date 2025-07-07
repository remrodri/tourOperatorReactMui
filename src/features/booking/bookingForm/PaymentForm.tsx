import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, styled, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { CloudUpload } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.locale("es");

interface PaymentFormProps{
    payment:any;
    onChange:(field:string,value:any)=>void;
    errors:any;
    touched:any;
    isEditing:boolean;
    handleFileChange:(event:ChangeEvent<HTMLInputElement>)=>void;
    previewImage:string | null;
    fileSelected:File | null;
    handleAmountChange:(amount:number)=>void;
}

const paymentMethods=[
    {value:"cash",label:"Efectivo"},
    {value:"bank_transfer",label:"Transferencia Bancaria"},
]

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const PaymentForm:React.FC<PaymentFormProps>=({
    payment,
    onChange,
    errors,
    touched,
    isEditing,
    handleFileChange,
    previewImage,
    fileSelected,
    handleAmountChange,
})=>{
    return(
        <Box
        sx={{
            display:"flex",
            flexDirection:"column",
            gap:2,
        }}
        >
            <Box
                sx={{
                    display:"flex",
                    justifyContent:"flex-end",
                    border:"1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius:"6px",
                    p:"5px 10px",
                }}
            >
            <Typography variant="subtitle1">
                Fecha de pago: {payment?.paymentDate}
            </Typography>
            </Box>
            <TextField
                // defaultValue={minimumAmount}
                size="small"
                fullWidth
                label="Monto"
                type="number"
                value={payment.amount===0 ? "" : payment.amount}
                onChange={(e)=>handleAmountChange(Number(e.target.value))}
                error={touched?.amount && Boolean(errors?.amount)}
                helperText={touched?.amount && errors?.amount}
                />
            <FormControl
                size="small"
                fullWidth
                error={touched?.paymentMethod && Boolean(errors?.paymentMethod)}
            >
                <InputLabel id="payment-method-label">Metodo de pago</InputLabel>
                <Select
                    disabled={isEditing}
                    labelId="payment-method-label"
                    id="payment-method"
                    value={payment.paymentMethod || ""}
                    label="Metodo de Pago"
                    onChange={(e)=>onChange("paymentMethod",e.target.value)}
                >
                    {paymentMethods.map((method)=>(
                        <MenuItem key={method.value} value={method.value}>
                            {method.label}
                        </MenuItem>
                    ))}
                </Select>
                {/* {errors?.paymentMethod && touched?.paymentMethod && (
                    <FormHelperText>{errors?.paymentMethod}</FormHelperText>
                )} */}
                </FormControl>
                {payment.paymentMethod === "bank_transfer" &&(
                    <Box>
                        <VisuallyHiddenInput
                            id="payment-proof-image"
                            name="payment-proof-image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="payment-proof-image">
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<CloudUpload/>}
                            >
                                Subir comprobante
                            </Button>
                        </label>
                        {
                            touched?.paymentProofImage && errors?.paymentProofImage &&(
                                <FormHelperText
                                error={Boolean(errors?.paymentProofImage)}
                                >{errors?.paymentProofImage}</FormHelperText>
                            )
                        }
                        {
                            previewImage &&(
                                <Box
                                sx={{
                                    mt:2,
                                }}
                                >
                                    <img 
                                    src={previewImage} 
                                    alt="payment-proof" 
                                    style={{
                                        width:"100%",
                                        height:"auto",
                                    }}
                                    />
                                </Box>
                            )
                        }
                    </Box>        
                )}
                
                
                
            
        </Box>
    )
}

export default PaymentForm
