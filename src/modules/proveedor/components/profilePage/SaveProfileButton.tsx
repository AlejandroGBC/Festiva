import React from 'react';
import Button from '../../../../shared/components/Button';
import { Loader2, Check } from 'lucide-react';

interface SaveProfileButtonProps {
    onClick: () => void;
    isSaving?: boolean;
}

//sincronizar los cambios: próximamente :)
export default function SaveProfileButton({ onClick, isSaving = false }: SaveProfileButtonProps) {
    return (
        <Button
            variant="secondary"
            onClick={onClick}
            disabled={isSaving}
        >
            {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <Check className="w-5 h-5 stroke-[2.5]" />
            )}
            {isSaving ? 'Guardando cambios...' : 'Guardar cambios'}
        </Button>
    );
}