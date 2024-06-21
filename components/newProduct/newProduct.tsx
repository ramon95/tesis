import { createNewProduct } from '@/api'
import { Input, InputSelect, InputTextArea } from '@/components'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface FormCreateProduct {
	name: string
	description: string
	image: string
	price: string
	typeProduct: string
}

export const NewProduct = () => {
	const {
		watch,
		register,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm<FormCreateProduct>({ mode: 'onChange' })

	const imageView = watch('image')

	const productOptions = [
		{ label: 'Ropa y accesorios', key: 'clothesAccesories' },
		{ label: 'Electrodomesticos y repuestos', key: 'appliancesSpareParts' },
		{ label: 'Perfumeria', key: 'perfumery' },
		{ label: 'Alimentos no perecederos', key: 'nonperishableFood' }
	]

	const rules = {
		name: {
			required: { value: true, message: 'Campo requerido' }
		},
		image: {
			required: { value: true, message: 'Campo requerido' }
		},
		description: {
			required: { value: true, message: 'Campo requerido' }
		},
		price: {
			required: { value: true, message: 'Campo requerido' }
		},
		typeProduct: {
			required: { value: true, message: 'Campo requerido' }
		}
	}

	const handleSubmitForm = async (dataForm: FormCreateProduct) => {
		const res = await createNewProduct(dataForm)
		if (res.errors) {
			toast.error(res.errors[0].message, {
				position: 'top-center'
			})
		} else {
			toast.success(res.message, {
				position: 'top-center'
			})
			setValue('name', '')
			setValue('description', '')
			setValue('image', '')
			setValue('price', '')
			setValue('typeProduct', '')
		}
	}

	return (
		<form onSubmit={handleSubmit(handleSubmitForm)} key={imageView}>
			<div className="pb-12">
				<h2 className="text-base font-semibold leading-7 text-gray-900">
					Crear un nuevo producto
				</h2>

				<div className="mt-10">
					<Input
						name="name"
						rules={rules.name}
						error={errors.name}
						register={register}
						placeholder="Producto"
						label="Nombre del producto"
					/>

					<InputTextArea
						name="description"
						register={register}
						placeholder="Description"
						error={errors.description}
						rules={rules.description}
						label="Description del producto"
					/>

					<Input
						name="price"
						type="number"
						register={register}
						placeholder="100"
						error={errors.price}
						rules={rules.price}
						label="Precio del producto"
					/>

					<InputSelect
						name="typeProduct"
						register={register}
						label="Tipo de producto"
						options={productOptions}
						rules={rules.typeProduct}
						error={errors.typeProduct}
					/>

					<Input
						url
						name="image"
						rules={rules.image}
						error={errors.image}
						register={register}
						label="Imagen del producto"
					/>
				</div>
				{imageView && (
					<div className="flex justify-center mt-5">
						<Image
							src={imageView}
							alt="preview image"
							width={300}
							height={300}
						/>
					</div>
				)}
			</div>

			<div className="flex justify-end">
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Crear
				</button>
			</div>
		</form>
	)
}
