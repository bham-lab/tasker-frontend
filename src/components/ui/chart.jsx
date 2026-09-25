

export const BarChart =({chartHeight="300px",data}) => {

 

}

export const countByDate = (todos) => {
    const counts = {}


    for(const todo of todos){
        const date = getDate(todo.createdAt)
           counts[date] = (counts[data] || 0) + 1
    }

    const chartData = Object.entries(counts).map(([date, count]) => {
        return {
            date,
            count
        }
    })

    chartData.sort((a,b) => {
        return new Date(a) - new Date(b)
    })

    return chartData
}



export const formatDate= (date) => {
   return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day:"numeric"
   })
}

export const getDate = (createdAt) => {
    return new Date(createdAt).toISOString().split("T")[0]
}


export const getLastDays = (days) => {
    const data = []
for (let i = 0 ; i < days;  i++)  {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    data.push(getDate(date)) 
}
return data
}