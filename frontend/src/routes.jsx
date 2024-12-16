import { UserGroupIcon, PlusCircleIcon, BuildingStorefrontIcon, BuildingOfficeIcon} from "@heroicons/react/24/solid";
import { GuestList, GuestCreate, GuestEdit, CategoryList, BrandList, ProductCreate, ProductEdit, ProductList} from "./pages/user/admin";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    userType: "Guest",
    layout: "guest",
    pages: [],
  },

  {
    title: "CRUD",
    userType: "Admin",
    layout: "admin",
    pages: [
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Invitados",
        path: "/invitados",
        isList: true,
        element: <GuestList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <GuestCreate />,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <GuestEdit />,
            hide: true,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <GuestList />,
            hide: true,
          },
        ],
      },
      {
        icon: <BuildingOfficeIcon {...icon} />,
        name: "Producto",
        path: "/productos",
        isList: true,
        element: <ProductList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <ProductCreate />,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <ProductEdit />,
            hide: true,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <ProductList />,
            hide: true,
          },
        ],
      },
      {
        icon: <BuildingStorefrontIcon {...icon} />,
        name: "Categorias",
        path: "/categorias",
        element: <CategoryList />,
        isList: true,
        hiddenSub: true,
        subpages: [
          {
            name: "Crear",
            path: "/crear",
            element: <CategoryList />,
            hide: true,
          },
          {
            name: "Editar",
            path: "/:id/editar",
            element: <CategoryList />,
            hide: true,
          },
          {
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <CategoryList />,
            hide: true,
          },
        ],
      },
      {
        icon: <BuildingStorefrontIcon {...icon} />,
        name: "Marcas",
        path: "/marcas",
        element: <BrandList />,
        isList: true,
        hiddenSub: true,
        subpages: [
          {
            name: "Crear",
            path: "/crear",
            element: <BrandList />,
            hide: true,
          },
          {
            name: "Editar",
            path: "/:id/editar",
            element: <BrandList />,
            hide: true,
          },
          {
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <BrandList />,
            hide: true,
          },
        ],
      },
      
    ],
  },
];

export default routes;
