import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StationService } from '../../services/StationService';
import StationForm from './StationForm';

export default function CreateStation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newStation) => StationService.create(newStation),
        onSuccess: () => {
            queryClient.invalidateQueries(['stations']);
            navigate('/dashboard');
        },
    });

    return (
        <StationForm
            title="Create New Station"
            isSubmitting={mutation.isPending}
            onSubmit={(data) => mutation.mutate(data)}
        />
    );
}
