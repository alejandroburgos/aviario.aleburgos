import React, {useState, useEffect} from 'react'
import { Loading } from '../../Loading/Loading'

export const SumTotalOfMoney = (props) => {

    const [sumRevenue, setSumRevenue] = useState(0)
    const [sumWithdrawal, setSumWithdrawal] = useState(0)

    const [loading, setLoading] = useState(true)
    // sum props.arrChartRevenue.data and props.arrChartWithdrawal.data
    useEffect(() => {
        setLoading(true)
        let sumRevenue = 0;
        let sumWithdrawal = 0;
        props.arrChartRevenue.data?.forEach(element => {
            sumRevenue += element;
        });
        props.arrChartWithdrawal.data?.forEach(element => {
            sumWithdrawal += element;
        });
        setSumRevenue(sumRevenue);
        setSumWithdrawal(sumWithdrawal);
        setLoading(false);
    }, [props.arrChartRevenue, props.arrChartWithdrawal])


    // useEffect(() => {
    //     if(props.arrChartRevenue.data?.length > 0 && props.arrChartWithdrawal.data?.length > 0){
    //         props.arrChartRevenue.data.forEach(element => {
    //             setSumRevenue(element);
    //         }
    //         )
    //         props.arrChartWithdrawal.data.forEach(element => {
    //             setSumWithdrawal(element);
    //         }
    //         )
    //     }
    //     console.log(sumRevenue, sumWithdrawal)
    // }, [props.arrChartRevenue.data, props.arrChartWithdrawal.data])
    
    return (
        <div>
            <h3 className="mb-0 display-3 mt-1 font-weight-bold">
                <span className="pr-1">
                    {loading ? <Loading /> : sumRevenue - sumWithdrawal}
                </span>
                €
            </h3>
        </div>
    )
}
