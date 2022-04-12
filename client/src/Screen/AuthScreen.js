export default function AuthScreen (Component: any) {
    return (props) => {
        const token=localStorage.getItem('token')
        if (!token)
            window.location.href = '/'
        return <Component {...props} />
    }
}