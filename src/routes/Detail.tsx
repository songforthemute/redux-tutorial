import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToDosType, ToDoType } from "store";

interface IdType {
    id?: string;
}

const Detail = () => {
    const { id }: IdType = useParams();
    const toDos = useSelector((state: ToDosType) => state);
    const toDo: ToDoType | undefined = toDos.find(
        (e: ToDoType) => e.id === Number(id)
    );

    const dateConvertor = (d: number) => {
        const createdAt = new Date(d).toLocaleString("ko-KR");
        return createdAt;
    };

    return (
        <>
            <h1>Title : {toDo?.text}</h1>
            {/* <h3>{toDo?.detail}</h3> */}
            <h5>Created At : {dateConvertor(Number(id))}</h5>
        </>
    );
};

export default Detail;
