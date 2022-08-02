import moment from 'moment';
import React, {useState, useEffect} from 'react'
import { FormCount } from './FormCount'
import { ResumeChart } from './ResumeChart'
import { ResumeTable } from './ResumeTable';

export const CountPage = (props) => {

    const [modeCard, setModeCard] = useState("chart");
  
    // useEffect and fetch with revenue
    const [revenue, setRevenue] = useState([]);
    const [withdrawal, setWithdrawal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [dataMoney, setDataMoney] = useState([])

    console.log(props)
    useEffect(() => {
        const url = `https://swr-dashboard.herokuapp.com/api/withdrawal/${props.state.user}`;
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setWithdrawal(json);
                setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        };
        fetchData();
    }, [props]);

    useEffect(() => {
        const url = `https://swr-dashboard.herokuapp.com/api/revenue/${props.state.user}`;
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setRevenue(json);
                setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        };
        fetchData();
    }, [props]);

    // concat revenue.revenue and withdrawal.withdrawal and add revenue.type or withdrawal.type to each element
    useEffect(() => {
      // concat y sort by moment date asc
      setDataMoney(revenue.revenue?.concat(withdrawal.withdrawal).sort((a, b) => moment(a.date).isBefore(moment(b.date)) ? 1 : -1));

    }, [revenue, withdrawal])


  return (
    <div className="pr-4 pl-4">
        <FormCount user={props.state.user} revenue={revenue} setArrRevenue={setRevenue} withdrawal={withdrawal} setArrWithdrawal={setWithdrawal}/>
        {modeCard === 'chart' ? 
            <ResumeChart user={props.state.user} revenue={revenue} withdrawal={withdrawal} dataMoney={dataMoney} modeCard={modeCard} setModeCard={setModeCard}/> : 
            <ResumeTable user={props.state.user} revenue={revenue} withdrawal={withdrawal} dataMoney={dataMoney} modeCard={modeCard} setModeCard={setModeCard}/>
        }
    </div>
  )
}
