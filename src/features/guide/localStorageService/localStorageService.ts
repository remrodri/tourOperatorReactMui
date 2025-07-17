export const createAttendanceList = (list:any[]) => {
    localStorage.setItem("attendanceList", JSON.stringify(list));
}
export const addTouristToAttendanceList = (tourist:{touristId:string, status:string}) => {
    if (!localStorage.getItem("attendanceList")) {
        
        localStorage.setItem("attendanceList", JSON.stringify([]));
    }
    const attendanceList = JSON.parse(localStorage.getItem("attendanceList") ?? "[]");
    attendanceList.push(tourist);
    localStorage.setItem("attendanceList", JSON.stringify(attendanceList));
};

export const getAttendanceListFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("attendanceList") || "[]");
};

export const removeAttendanceListFromLocalStorage = () => {
    localStorage.removeItem("attendanceList");
};

export const updateAttendanceListInLocalStorage = (tourist: { touristId: string; status: string }) => {
    const raw = localStorage.getItem("attendanceList") ?? "[]";
    const attendanceList = JSON.parse(raw);
  
    const updatedAttendanceList = attendanceList.map((group: any[]) =>
      group.map((t: any) => {
        // Si tiene estructura {tourist: { id }} usamos eso
        const currentId = t?.tourist?.id ?? t?.touristId;
  
        if (currentId === tourist.touristId) {
          return {
            ...t,
            status: tourist.status,
          };
        }
        return t;
      })
    );
  
    localStorage.setItem("attendanceList", JSON.stringify(updatedAttendanceList));
    return updatedAttendanceList;
  };
  

