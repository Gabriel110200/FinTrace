import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function comparaSenhas(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        // Verifica se o controle é um FormGroup
        const form = control as FormGroup;

        const senha = form.get("senha")?.value;
        const senha2 = form.get("senha2")?.value;

        if (senha && senha2) {
            const senhaValida = (senha === senha2);
            return senhaValida ? null : { senhasDiferentes: true }; // Altere a chave do erro para algo mais descritivo
        }

        return null;
    };
}


