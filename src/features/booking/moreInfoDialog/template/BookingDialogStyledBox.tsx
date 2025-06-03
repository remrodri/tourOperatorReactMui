import { Box } from "@mui/material"

const BookingDialogStyledBox:React.FC<{sx?:any,children:React.ReactNode}>=({sx={},children})=>{
  return <Box
  sx={{
    // height: "100%",
    // width: "100%",
    // p: 2,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    
    background: "rgba(0, 0, 0, 0.45)",
    borderRadius: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)",
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
