export default function ({ app, redirect }) {
   const user = app.$auth.user;
   if (user.role !== 'admin') {
      redirect('/');
   }
}