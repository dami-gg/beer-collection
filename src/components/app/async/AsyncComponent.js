// @flow
import Loadable from "react-loadable";
import Spinner from "../../common/spinner/Spinner";

export default function Async(asyncLoader: Function) {
  return Loadable({
    loader: asyncLoader,
    loading: Spinner,
    delay: 300
  });
}
