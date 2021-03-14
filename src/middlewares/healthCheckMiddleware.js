
function HealthCheckMiddlewre({
    loggerService
}){

    async function middleware(ctx,next){
        ctx.body = 'flowbuild mission-control api';
        ctx.status = 200;
    }

    return middleware;
}

module.exports = HealthCheckMiddlewre
