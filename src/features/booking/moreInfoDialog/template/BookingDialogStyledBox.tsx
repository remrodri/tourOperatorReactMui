import { Box } from "@mui/material"

const BookingDialogStyledBox:React.FC<{sx?:any,children:React.ReactNode}>=({sx={},children})=>{
  return <Box
  sx={{
    height: "100%",
    width: "100%",
    p: 2,
    background: "rgba(0, 0, 0, 0.45)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 0, 0, 0.45)",
    overflowY:"auto",
    ...sx,
  }}
  >
    {children}
  </Box>
}
export default BookingDialogStyledBox
