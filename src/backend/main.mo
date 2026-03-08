import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

actor {
  type Contact = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    submittedAt : Int;
  };

  module Contact {
    public func compare(contact1 : Contact, contact2 : Contact) : Order.Order {
      Int.compare(contact1.submittedAt, contact2.submittedAt);
    };
  };

  var nextContactId = 1;

  let submissions = Map.empty<Nat, Contact>();

  func getAdminId() : Principal {
    Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
  };

  func assertAdminIsCaller(caller : Principal) {
    if (caller != getAdminId()) { Runtime.trap("Caller must be admin") };
  };

  public shared ({ caller }) func submitContact(name : Text, email : Text, phone : Text, message : Text, timestamp : Int) : async () {
    let contact : Contact = {
      id = nextContactId;
      name;
      email;
      phone;
      message;
      submittedAt = timestamp;
    };
    submissions.add(nextContactId, contact);
    nextContactId += 1;
  };

  public shared ({ caller }) func getAllContactSubmissions() : async [Contact] {
    assertAdminIsCaller(caller);
    submissions.values().toArray().sort();
  };
};
