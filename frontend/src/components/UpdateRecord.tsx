import EditIcon from "@mui/icons-material/Edit";
import { RecordButton } from "./ListItem";

export const UpdateRecord = () => {
    return (
        <>
            <RecordButton variant="contained">
                <EditIcon />
            </RecordButton>
        </>
    );
};
