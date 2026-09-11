// Gate de acceso para /biblioteca/: solo deja pasar si la URL trae el
// token correcto en ?t=. Sin el token (o con uno incorrecto), redirige
// a la landing del formulario en vez de mostrar la biblioteca.
//
// El valor real del token vive SOLO en la variable de entorno
// BIBLIOTECA_TOKEN configurada en Netlify (Site configuration >
// Environment variables) — nunca en este archivo ni en el repo.

export default async (request, context) => {
  const url = new URL(request.url);
  const expected = Netlify.env.get("BIBLIOTECA_TOKEN");
  const provided = url.searchParams.get("t");

  if (!expected || provided !== expected) {
    return Response.redirect(
      new URL("/recursos/ebooks-podcast/", url.origin),
      302
    );
  }

  return context.next();
};

export const config = {
  path: "/biblioteca/*",
};
