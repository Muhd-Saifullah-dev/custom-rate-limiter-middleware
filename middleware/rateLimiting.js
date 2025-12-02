
const rateLimiter=(()=>{
    const request_count=new Map() //store ip and currentTime
    const window_size=5*60*1000 //5 min in millisecond
    const max_request=5

    return (req,res,next)=>{
        const ip=req.ip
        const currentTime=Date.now()
        let ip_data=request_count.get(ip)

        if(!ip_data){
            ip_data={count:1,startTime:currentTime}
            request_count.set(ip,ip_data)
            return next()
        }

        if(currentTime-ip_data.startTime > window_size){
            ip_data.count=1
            ip_data.startTime=currentTime
            request_count.set(ip,ip_data)
            return next()
        }

        ip_data.count +=1

        if(ip_data.count>max_request){
            return res.status(420).json({message:"Too many request ... please try again later"})
        }

        request_count.set(ip,ip_data)
        return next()

    }

})()

module.exports={
    rateLimiter
}