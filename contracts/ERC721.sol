// contracts/ERC721.sol
// Author: @hansrajrami
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MYTOKEN is Initializable, ERC721Upgradeable, OwnableUpgradeable {
    uint256 private _currentTokenID;
    string public baseURI;
    mapping(uint256 => string) private _tokenURIs;

    function initialize(
        string memory name_,
        string memory symbol_,
        string memory baseURI_
    ) public initializer {
        __ERC721_init(name_, symbol_);
        __Ownable_init();
        baseURI = baseURI_;
        // _currentTokenID = 0;
    }

    function createAsset(address owner, string calldata _tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 newTokenID = _currentTokenID;
        _safeMint(owner, newTokenID);
        _tokenURIs[newTokenID] = _tokenURI;
        
        _currentTokenID = newTokenID + 3;
        return newTokenID;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        // _requireMinted(tokenId);
        string memory baseUri = _baseURI();
        return string(abi.encodePacked(baseUri, _tokenURIs[tokenId]));
    }

    // function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function contractURI() public pure returns (string memory) {
        return "https://gist.githubusercontent.com/hansrajrami/f514f1423047d89305c09889b1fa623f/raw/4fef0d18265704377d16fa2f3ae1280bbd7e1167/asset-tokenization-blockchain-demo.json";
    }
}