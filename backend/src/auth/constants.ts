import { Injectable, SetMetadata } from "@nestjs/common";
import { registerAs } from "@nestjs/config";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// TODO
// Do not expose this key publicly. We have done so here to make it clear what the code is doing,
// but in a production system you must protect this key using appropriate measures such as a secrets vault,
// environment variable, or configuration service.
// Environment variable setzen => docker

// const dbUser = this.configService.get<string>('NESTJS_SECRET_KEY');
//     console.log('db User: ', dbUser);

// sudo echo ‚export NESTJS_SECRET_KEY='gugelhupf'‘ >> /etc/profile.d/nest_environmentvariables.sh
// restart
export const jwtConstants = {
  expireTimeAccess: '1h', // 1 Stunde - für 60 sekunden könnte man z.B. '60s' nehmen
  expireTimeRefresh: '168h', // 1 woche
};
