import react, {useEffect} from "react" 

const CouponLoad = (props) => {
useEffect(() => {
    window.location.open(`https://ava-rewards.com/${props.match.params.couponUrlRedirect}`,"_blank")                                             }, []);
return (<></>)
}

export default CouponLoad
