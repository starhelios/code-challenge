import SecretValue from './SecretValue';

export default ({ guest }) => {
  return (
    <tr>
      <td>{guest.name}</td>
      <td>
        <SecretValue content={guest.pin} />
      </td>
      <td>{guest.startsAt}</td>
    </tr>
  );
};
