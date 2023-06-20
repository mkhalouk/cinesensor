interface ILoginService {
    login(data : any, setCookieFn: (name: string, value: string, options?: any) => void) : Promise<boolean>;
}

export default ILoginService;