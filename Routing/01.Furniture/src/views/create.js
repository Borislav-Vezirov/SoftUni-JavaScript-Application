import { createFurniture } from "../api/data.js";
import { html } from "../library.js";


const createTemplate = (onSubmit, errMsg, errors) => html `

    <div class="row space-top">
                <div class="col-md-12">
                    <h1>Create New Furniture</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form @submit=${onSubmit}>
                ${errMsg ? html `<div><p class="error">${errMsg}</p></div>` : ''}
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class=${"form-control" + (errors.make ? " is-invalid" : " is-valid")} id="new-make" type="text" name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class=${"form-control" + (errors.model ? " is-invalid" : " is-valid")} id="new-model" type="text" name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class=${"form-control" + (errors.year ? " is-invalid" : " is-valid")} id="new-year" type="number" name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class=${"form-control" + (errors.description ? " is-invalid" : " is-valid")} id="new-description" type="text" name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class=${"form-control" + (errors.price ? " is-invalid" : " is-valid")} id="new-price" type="number" name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class=${"form-control" + (errors.img ? " is-invalid" : " is-valid")} id="new-image" type="text" name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create" />
            </div>
        </div>
    </form>
`;

export function createPage(ctx) {

    update(null, {});

    function update(errMsg, errors) {

        ctx.render(createTemplate(onSubmit, errMsg, errors));
    }

    async function onSubmit(e) {

        e.preventDefault();

        const formData = [...new FormData(e.target).entries()];

        const data = formData.reduce((acc, [k, v]) => Object.assign(acc, {
            [k]: v
        }), {});

        const emptyFields = formData.filter(([k, v]) => k != 'material' && v == '');

        try {

            if (emptyFields.length > 0) {

                const errors = emptyFields.reduce((acc, [k]) => Object.assign(acc, {[k]: true }), {});

                throw {
                    error: new Error('Please fill all required fields'),
                    errors
                }
            }

            data.year = Number(data.year);
            data.price = Number(data.price);

            await createFurniture(data);

            ctx.page.redirect('/');

        } catch (err) {
            const message = err.message || err.error.message;
            update(message, err.errors || {});
        }
    }
}