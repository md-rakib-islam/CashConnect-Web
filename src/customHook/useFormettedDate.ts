
const useFormettedDate = (date: string = "", increaseDate: number = 0) => {

    const findMonth = [
        {id: 1, name: "Jan."},
        {id: 2, name: "Feb."},
        {id: 3, name: "Mar."},
        {id: 4, name: "Apr."},
        {id: 5, name: "May"},
        {id: 6, name: "Jun."},
        {id: 7, name: "Jul."},
        {id: 8, name: "Aug."},
        {id: 9, name: "Sep."},
        {id: 10, name: "Oct."},
        {id: 11, name: "Nov."},
        {id: 12, name: "Dec."},
    ]

    const year = date.slice(0,4)
    const month: any = date.slice(5,7)
    const main_date = (Number(date.slice(8,10)) + increaseDate)

    return `${main_date} ${findMonth.find((monthData) => month == monthData.id)?.name} ${year}`
}

export default useFormettedDate
