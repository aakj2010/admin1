import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faWrench } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import UserContext from "./UserContext";

function Dashboard() {
    let context = useContext(UserContext)
    const cards = [
        {
            title: "EARNINGS (MONTHLY)",
            price: "$40000",
            theme: "primary",
        },
        {
            title: "EARNINGS (ANNUAL)",
            price: "$215,000",
            theme: "success",
        },
        {
            title: "TASKS",
            price: "50%",
            theme: "info"
        },
        {
            title: "PENDING REQUESTS",
            price: "18",
            theme: "warning"
        }
    ]
    return (
        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                {context.username}
                <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
            </div>
            <div class="row">
                {
                    cards.map((card) => {
                        return <Card card={card}></Card>
                    })
                }
            </div>
            
        </div>

    )
}
export default Dashboard;